import { Empty, message, notification, Upload, Modal } from 'antd';
import { RcFile } from 'rc-upload/lib/interface';
import React, { useContext, useEffect, useState } from 'react';
import { AddSvg, DeleteSvg } from '../../assets/icon';
import StyleModule from './style.module.less';
import ImageModuleClass from '../../modules/Image/moduleClass';
import { StoreActionType } from '../../store/module';
import { uniqueId } from './../../utils/uniqueId';
import { EditorContext } from '@/Editor';
import { ModuleType } from '@/Editor/modules/TypeConstraints';

const imageDefaultAccept = ['jpg', 'jpeg', 'png'];

const DELETE_SVG = (
  <DeleteSvg
    {...{
      width: 12,
      height: 12,
    }}
  />
);

const DEFAULT_SIZE = 75;

export interface ImageInfo {
  url: string;
  width: number;
  height: number;
  id: string;
}

export interface ImageAction {
  // 获取图片列表
  getImageList: () => Promise<ImageInfo[]>;
  // 上传图片，返回回调
  uploadImage: (formData: FormData) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  maxCountImage?: number;
}

const ModuleImageNav: React.FC = () => {
  const { imageAction, dispatch } = useContext(EditorContext);
  const [file, setFile] = useState<RcFile>();
  const [imageList, setImageList] = useState<ImageInfo[]>([]);
  const [reload, setReload] = useState(false);
  const { getImageList, uploadImage, deleteImage, maxCountImage } = imageAction || {};
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    getImageList?.()
      .then((imageList) => {
        setImageList(imageList);
      })
      .finally(() => {
        setImageLoading(false);
      });
  }, [getImageList, reload]);

  // 添加组件
  function addComponent(imageInfo: ImageInfo) {
    const { url: src, width: imageWidth, height: imageHeight } = imageInfo;
    const radio = imageWidth / imageHeight;
    // 计算新的初始化 width 和 height
    let newImageWidth = DEFAULT_SIZE;
    let newImageHeight = DEFAULT_SIZE;
    if (radio > 0) newImageHeight = DEFAULT_SIZE / radio;
    else {
      newImageWidth = DEFAULT_SIZE * radio;
    }

    dispatch({
      type: StoreActionType.AddModuleDatas,
      payload: {
        moduleDatas: [
          {
            id: uniqueId(),
            type: ModuleType.Image,
            props: {
              ...ImageModuleClass.initProps,
              height: newImageHeight,
              width: newImageWidth,
              src,
            },
          },
        ],
      },
    });
  }

  // 删除图片
  function handleDeleteImage(imageId: string) {
    deleteImage?.(imageId)
      .then(() => {
        notification.success({ message: '删除成功' });
        setReload((flag) => !flag);
      })
      .catch(() => {
        notification.success({ message: '删除失败' });
      });
    setImageList((list) => list.filter((item) => item.id !== imageId));
  }

  return (
    <div className={StyleModule['module-image-nav']}>
      <Upload
        disabled={imageList.length >= (maxCountImage || 0)}
        listType="picture"
        className="image-upload"
        accept={imageDefaultAccept.join(',')}
        beforeUpload={function (file: RcFile) {
          const isLimitType = imageDefaultAccept.some((acceptType: string) =>
            new RegExp(`\\.${acceptType}$`, 'i').test(file.name),
          );
          // 是否符合类型
          if (!isLimitType) {
            const errorMessage = `文件格式只支持：${imageDefaultAccept.join('、')}`;
            message.error(errorMessage);
            return Promise.reject(errorMessage);
          }
          // 是否符合大小
          const isLimitSize = file.size / 1024 <= 5 * 1024;
          if (!isLimitSize) {
            const errorMessage = '文件大小不能大于5MB';
            message.error(errorMessage);
            return Promise.reject(message);
          }
          setFile(file);
          return Promise.resolve();
        }}
        customRequest={() => {
          const formData = new FormData();
          formData.append('file', file as RcFile);
          uploadImage?.(formData)
            .then(() => {
              notification.success({ message: '上传成功' });
              setReload((flag) => !flag);
            })
            .catch(() => {
              setImageLoading(false);
              notification.success({ message: '上传失败' });
            });
          setImageLoading(true);
        }}
        fileList={[]}
      >
        <AddSvg />
        <span>上传图片</span>
      </Upload>

      <div className="att">仅支持jpg、png、gif格式的图片</div>
      <div className="image-container-title">已上传图片</div>
      <div className="image-container">
        {imageLoading && (
          <div className="image-item">
            <span className="loading-text">loading</span>
          </div>
        )}
        {imageList.map((imageInfo) => (
          <div key={imageInfo.id} className="image-item" onClick={() => addComponent(imageInfo)}>
            <div className="mark">
              <span
                onClick={(event) => {
                  event.stopPropagation();
                  event.nativeEvent.stopPropagation();
                  Modal.confirm({
                    title: '删除图片',
                    content: '确认是否删除图片？',
                    onOk() {
                      handleDeleteImage(imageInfo.id);
                    },
                  });
                }}
              >
                {DELETE_SVG}
              </span>
            </div>
            <img src={imageInfo.url} style={{ width: '100%', height: '100%' }} />
          </div>
        ))}
        {!imageLoading && imageList.length === 0 ? (
          <Empty style={{ width: '100%' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : null}
      </div>
    </div>
  );
};

export default ModuleImageNav;

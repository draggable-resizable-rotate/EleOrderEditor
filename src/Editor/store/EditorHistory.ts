export default class EditorHistory<T> {
  snapshotArr: T[];
  undoSnapshotArr: T[];
  maxSnapshotCount: number;
  // 兜底的快照，如果用户注册outSnapshot，当历史记录的长度只有1时，触发撤销，会返回兜底的快照
  outSnapshot?: T;
  constructor(maxSnapshotCount = 100, outSnapshot?: T) {
    // 保存数据快照
    this.snapshotArr = [];
    // 保存撤销的数据快照
    this.undoSnapshotArr = [];
    // 最大存储快照数
    this.maxSnapshotCount = maxSnapshotCount;
    this.outSnapshot = outSnapshot;
  }
  // 重置
  reset() {
    this.snapshotArr = [];
    this.undoSnapshotArr = [];
  }
  // 保存
  save(snapshot: T) {
    // 深拷贝
    const copySnapshot = JSON.parse(JSON.stringify(snapshot));
    // 超出长度的弹出
    if (this.snapshotArr.length >= this.maxSnapshotCount) {
      this.snapshotArr.shift();
    }
    // 保存当前快照
    this.snapshotArr.push(copySnapshot);
    // 新增之后无法撤销
    this.undoSnapshotArr = [];
  }
  // 撤销
  undo() {
    if (this.snapshotArr.length >= 1) {
      const latest = this.snapshotArr.pop() as T;
      this.undoSnapshotArr.push(latest);
      // 可能变成空数组了
      const show = this.snapshotArr[this.snapshotArr.length - 1];
      return show || this.outSnapshot || null;
    }
    throw Error('快照为0, 不允许执行撤销');
  }
  // 重做
  redo() {
    if (this.undoSnapshotArr.length >= 1) {
      const latestUndo = this.undoSnapshotArr.pop() as T;
      this.snapshotArr.push(latestUndo);
      return latestUndo;
    }
    throw Error('撤销快照为0，不允许执行重做');
  }
  // 获取当前历史记录允许操作的状态
  getState() {
    const snapshotArrLength = this.snapshotArr.length;
    const undoSnapshotArrLength = this.undoSnapshotArr.length;
    return {
      // 当前快照数量
      currentCount: snapshotArrLength,
      // 还能保存的数量（在不覆盖的情况下）
      canSaveCount: this.maxSnapshotCount - snapshotArrLength,
      // 能否撤销
      canUndo: snapshotArrLength >= 1,
      // 能否重做
      canRedo: undoSnapshotArrLength >= 1,
    };
  }
}


export type EditorHistoryState = ReturnType<EditorHistory<any>['getState']>;

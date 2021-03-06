import { CRUDService, CRUDServiceConfig, GraphbackContext } from '@graphback/core';
import { DataSyncProvider } from "../providers";

export interface SyncList<T> {
  items: T[],
  lastSync: string
}

/**
 * CRUD Service for datasync
 */
export class DataSyncCRUDService<T = any> extends CRUDService<T> {

  public constructor(modelName: string, db: DataSyncProvider, config: CRUDServiceConfig) {
    super(modelName, db, config);
  }
  /**
   * sync
   * For delta queries
   */
  public async sync(lastSync: string, context: GraphbackContext, filter?: any): Promise<SyncList<T>> {

    const res = await (this.db as DataSyncProvider).sync(lastSync, context, filter);

    return {
      items: res,
      lastSync: Date.now().toString()
    }
  }
}

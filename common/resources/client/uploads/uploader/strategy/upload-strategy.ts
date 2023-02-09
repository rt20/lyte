import {BackendMetadata} from '../../types/backend-metadata';
import {Restrictions} from '../validate-upload';
import {FileEntry} from '../../file-entry';

export interface UploadStrategyConfig {
  chunkSize?: number;
  baseUrl?: string;
  restrictions?: Restrictions;
  showToastOnRestrictionFail?: boolean;
  onProgress?: (progress: {bytesUploaded: number; bytesTotal: number}) => void;
  onSuccess?: (entry: FileEntry) => void;
  onError?: (message?: string) => void;
  metadata?: BackendMetadata;
}

export interface UploadStrategy {
  start: () => void;
  abort: () => Promise<void>;
}

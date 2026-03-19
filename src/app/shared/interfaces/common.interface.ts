export interface SkeletonItem {
  type: 'text' | 'circle' | 'rect';
  width?: string;
  height?: string;
  count?: number;
  gap?: string;
  direction?: 'row' | 'column';
  overflow?: 'hidden' | 'auto';
  mb?: string;
}

export interface SkeletonConfig {
  items: SkeletonItem[];
  direction?: 'row' | 'column';
}

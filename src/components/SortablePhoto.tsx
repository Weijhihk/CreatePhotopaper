import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, Edit2 } from 'lucide-react';
import { PhotoData } from '../context/PhotoContext';

interface SortablePhotoProps {
  photo: PhotoData;
  index: number;
  onEdit: (photo: PhotoData) => void;
  onRemove: (id: string) => void;
}

export function SortablePhoto({ photo, index, onEdit, onRemove }: SortablePhotoProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onEdit(photo)}
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing touch-none"
    >
      <div className="aspect-[4/3] bg-gray-100 relative">
        <img
          src={photo.url}
          alt="Upload preview"
          className="w-full h-full object-cover pointer-events-none" // Prevent image dragging interfering with dnd
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 bg-white/90 p-2 rounded-full shadow-sm transform scale-90 group-hover:scale-100 transition-all">
            <Edit2 className="w-5 h-5 text-gray-700" />
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(photo.id);
          }}
          // Add data-no-dnd="true" if we want to prevent drag start on this button, 
          // but pointer-events-auto on button usually handles it.
          // However, since the parent has listeners, we need to stop propagation on pointer down too if we want to be safe,
          // but usually onClick stopPropagation is enough for click actions.
          // For dnd-kit, we might need onPointerDown={(e) => e.stopPropagation()} if the button triggers drag.
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
          #{index + 1}
        </div>
      </div>
      <div className="p-3 border-t border-gray-100">
        <div className="text-xs text-gray-500 mb-1">
          {photo.date || '未設定日期'}
        </div>
        <div className="text-sm text-gray-900 truncate font-medium">
          {photo.description || '點擊新增說明...'}
        </div>
      </div>
    </div>
  );
}

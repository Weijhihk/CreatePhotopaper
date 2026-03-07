import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowRight } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { usePhotos, PhotoData } from '../context/PhotoContext';
import EditPhotoModal from '../components/EditPhotoModal';
import { SortablePhoto } from '../components/SortablePhoto';

export default function UploadPage() {
  const { photos, addPhotos, removePhoto, clearPhotos, updatePhoto, reorderPhotos } = usePhotos();
  const navigate = useNavigate();
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PhotoData | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts to prevent accidental drags on clicks
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDraggingFile) {
      setIsDraggingFile(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if we are really leaving the dropzone or just entering a child element
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const imageFiles = Array.from(e.dataTransfer.files).filter((file: File) =>
        file.type.startsWith('image/')
      );
      if (imageFiles.length > 0) {
        addPhotos(imageFiles);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFiles = Array.from(e.target.files).filter((file: File) =>
        file.type.startsWith('image/')
      );
      if (imageFiles.length > 0) {
        addPhotos(imageFiles);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = photos.findIndex((p) => p.id === active.id);
      const newIndex = photos.findIndex((p) => p.id === over.id);
      
      reorderPhotos(arrayMove(photos, oldIndex, newIndex));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">施工照片報告產生器</h1>
          <p className="text-gray-600">拖曳照片至此，自動生成標準施工報告格式</p>
        </header>

        {/* Dropzone */}
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer
            ${isDraggingFile ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:border-gray-400'}
          `}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <input
            type="file"
            id="fileInput"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                點擊或拖曳照片至此上傳
              </p>
              <p className="text-sm text-gray-500 mt-1">支援 JPG, PNG 格式</p>
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        {photos.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                已上傳照片 ({photos.length})
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={clearPhotos}
                  className="px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  清空全部
                </button>
                <button
                  onClick={() => navigate('/report')}
                  className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  產生報告
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={photos.map(p => p.id)}
                strategy={rectSortingStrategy}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photo, index) => (
                    <SortablePhoto
                      key={photo.id}
                      photo={photo}
                      index={index}
                      onEdit={setEditingPhoto}
                      onRemove={removePhoto}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>

      <EditPhotoModal
        photo={editingPhoto}
        isOpen={!!editingPhoto}
        onClose={() => setEditingPhoto(null)}
        onSave={updatePhoto}
      />
    </div>
  );
}


import React from 'react';
import { Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageAuditTool from '@/components/ImageAuditTool';
import ImageDebugger from '@/components/ImageDebugger';

interface ImageManagementToolsProps {
  showAuditTool: boolean;
  setShowAuditTool: (show: boolean) => void;
}

const ImageManagementTools = ({ showAuditTool, setShowAuditTool }: ImageManagementToolsProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Image Management Tools</h3>
        <Button
          onClick={() => setShowAuditTool(!showAuditTool)}
          variant="outline"
          className="border-blue-500 text-blue-500 hover:bg-blue-50"
        >
          <Bug className="mr-2 h-4 w-4" />
          {showAuditTool ? 'Hide' : 'Show'} Image Audit Tool
        </Button>
      </div>
      
      {showAuditTool && <ImageAuditTool />}
      
      <div className="mt-4">
        <ImageDebugger />
      </div>
    </div>
  );
};

export default ImageManagementTools;

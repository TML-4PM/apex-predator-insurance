
import React from 'react';
import { usePWA } from '@/hooks/usePWA';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Bell, X } from 'lucide-react';

interface InstallPromptProps {
  onDismiss: () => void;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ onDismiss }) => {
  const { isInstallable, isInstalled, installApp, requestNotificationPermission } = usePWA();

  if (isInstalled || !isInstallable) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm border-apex-red shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Install App</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Get the full experience with our mobile app
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex space-x-2">
          <Button
            onClick={installApp}
            className="flex-1 bg-apex-red hover:bg-apex-red/80"
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Install
          </Button>
          <Button
            onClick={requestNotificationPermission}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Bell className="mr-2 h-4 w-4" />
            Notify
          </Button>
        </div>
        <p className="text-xs text-gray-500 text-center">
          Offline access • Push notifications • Better performance
        </p>
      </CardContent>
    </Card>
  );
};

export default InstallPrompt;

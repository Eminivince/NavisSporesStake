// NotificationContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { notification } from 'antd';
import { NotificationInstance } from 'antd/es/notification/interface';

interface NotificationContextType {
  notification: NotificationInstance;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={{ notification: api }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context.notification;
};

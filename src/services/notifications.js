import api from './api';
import config from './config';

function getConversations(isDoctor) {
  const params = isDoctor ? { isDoctor } : {};
  return api.get(`${config.apiUrl}/api/conversations/`, params);
}

function getMessages(convId) {
  return api.get(`${config.apiUrl}/api/messages/${convId}`);
}

function newMessage(payload, headers = {}) {
  return api.post(`${config.apiUrl}/api/messages/new`, payload, null, headers);
}

function getUnreadMessagesCount() {
  return api.get(`${config.apiUrl}/api/messages/unread`);
}

function getAttachment(msgId) {
  return api.getFile(`${config.apiUrl}/api/messages/attachment/${msgId}/download`);
}

function markMessagesAsRead(convId) {
  return api.get(`${config.apiUrl}/api/messages/${convId}/mark-read`);
}

export {
  getConversations,
  getMessages,
  newMessage,
  getUnreadMessagesCount,
  getAttachment,
  markMessagesAsRead
}

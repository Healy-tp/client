import api from './api';

function getConversations(isDoctor) {
  const params = isDoctor ? { isDoctor } : {};
  return api.get('http://localhost:8000/api/conversations/', params);
}

function getMessages(convId) {
  return api.get(`http://localhost:8000/api/messages/${convId}`);
}

function newMessage(payload, headers = {}) {
  return api.post('http://localhost:8000/api/messages/new', payload, { headers });
}

function getUnreadMessagesCount() {
  return api.get('http://localhost:8000/api/messages/unread');
}

function getAttachment(msgId) {
  return api.getFile(`http://localhost:8000/api/messages/attachment/${msgId}/download`);
}

function markMessagesAsRead(convId) {
  return api.get(`http://localhost:8000/api/messages/${convId}/mark-read`);
}

export {
  getConversations,
  getMessages,
  newMessage,
  getUnreadMessagesCount,
  getAttachment,
  markMessagesAsRead
}

import api from './api';

function getConversations(isDoctor) {
  const params = isDoctor ? { isDoctor } : {};
  return api.get('http://localhost:8082/api/conversations/', params);
}

function getMessages(convId) {
  return api.get(`http://localhost:8082/api/messages/${convId}`);
}

function newMessage(payload) {
  return api.post('http://localhost:8082/api/messages/new', payload);
}

function getUnreadMessagesCount() {
  return api.get('http://localhost:8082/api/messages/unread');
}

function markMessagesAsRead(convId) {
  return api.get(`http://localhost:8082/api/messages/${convId}/mark-read`);
}

export {
  getConversations,
  getMessages,
  newMessage,
  getUnreadMessagesCount,
  markMessagesAsRead
}

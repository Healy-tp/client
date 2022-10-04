import api from './api';

function getConversations(isDoctor) {
  return api.get('http://localhost:8082/api/conversations/', { isDoctor });
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

export {
  getConversations,
  getMessages,
  newMessage,
  getUnreadMessagesCount,
}

var initialState = {
  id: localStorage.getItem('id'),
  id_card: localStorage.getItem('id_card'),
  fullname: localStorage.getItem('fullname'),
  role_id: localStorage.getItem('role_id'),
};

export default function Authentication(state = initialState, action) {
  switch (action.type) {
    case 'AUTHEN':
      localStorage.setItem('id', action.id);
      localStorage.setItem('id_card', action.id_card);
      localStorage.setItem('fullname', action.fullname);
      localStorage.setItem('role_id', action.role_id);
      return {
        ...state,
        id: localStorage.getItem('id'),
        id_Card: localStorage.getItem('id_card'),
        fullname: localStorage.getItem('fullname'),
        role_id: localStorage.getItem('role_id'),
      };
    case 'UAUTHEN':
      localStorage.removeItem('id');
      localStorage.removeItem('id_card');
      localStorage.removeItem('fullname');
      localStorage.removeItem('role_id');
      return {
        ...state,
        id: localStorage.getItem('id'),
        id_card: localStorage.getItem('id_card'),
        fullname: localStorage.getItem('fullname'),
        role_id: localStorage.getItem('role_id'),
      };
    case 'USERINFO':
      return {
        ...state,
        id: localStorage.getItem('id'),
        id_card: localStorage.getItem('id_card'),
        fullname: localStorage.getItem('fullname'),
        role_id: localStorage.getItem('role_id'),
      };
    default:
      return {
        ...state,
        id: localStorage.getItem('id'),
        id_card: localStorage.getItem('id_card'),
        fullname: localStorage.getItem('fullname'),
        role_id: localStorage.getItem('role_id'),
      };
  }
}

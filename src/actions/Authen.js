export function AUTHEN(id, id_card, fullname, role_id) {
  return { type: 'AUTHEN', id, id_card, fullname, role_id };
}

export function UAUTHEN() {
  return { type: 'UAUTHEN' };
}

export function USERINFO() {
  return { type: 'USERINFO' };
}

export function AUTHORITIES(id, id_card, fullname, role_id){
  return { type: 'AUTHORITIES',id,id_card,fullname,role_id};
}

export default class FichaSchema {
  static schema = {
    name: 'Ficha',
    primaryKey: 'id',
    properties :{
      id: {type: 'int', indexed: true},
      user_id: {type: 'int', indexed: true},
      nome: 'string',
      descricao: 'string'
    }
  }
}

import Realm from 'realm';

import FichaSchema from '~/schemas/FichasSchema';

export default function getRealm() {
  return Realm.open({
    schema: [FichaSchema],
  });
}

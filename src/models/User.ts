import { UserSchema } from 'interfaces';
import { API } from 'utils';

class User implements UserSchema {
  id!: number;
  name!: string;
  username!: string;
  email!: string;
  address!: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone!: string;
  website!: string;
  company!: { name: string; catchPhrase: string; bs: string };

  constructor(props: UserSchema) {
    if (props) {
      Object.assign(this, props);
    }
  }

  static async fetchAll(options: RequestInit): Promise<User[]> {
    const result = await API.get('users', options);

    return result.map((data: User) => new User(data));
  }

  static async fetch(id: number, options: RequestInit): Promise<User> {
    const result = await API.get(`users/${id}`, options);

    return new User(result);
  }
}

export { User };

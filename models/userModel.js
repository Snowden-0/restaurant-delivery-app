const userSchema = {
  id: {
    type: 'UUID',
    primaryKey: true,
    defaultValue: 'gen_random_uuid()',
  },
  username: {
    type: 'VARCHAR(255)',
    allowNull: false,
    unique: true,
  },
  password: {
    type: 'VARCHAR(255)',
    allowNull: false,
  },
};

export default userSchema;
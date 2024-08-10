import configuration from 'src/config/configuration';

export const jwtConstants = {
  secret: configuration().jwtSecret,
};

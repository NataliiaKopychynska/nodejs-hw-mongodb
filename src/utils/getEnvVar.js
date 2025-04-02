// import dotenv from 'dotenv';
// dotenv.config();

export function getEnvVar(name, defaultValue) {
  const value = process.env[name];
  if (value) return value;
  if (defaultValue) return defaultValue;

  throw new Error(`missing process.env.${name}`);
}

// export function getEnvVar(name) {
//   const value = process.env[name];
//   if (value) return value;

//   throw new Error(`missing process.env.${name}`);
// }

// export default getEnvVar;

// function getEnvVar(name, defaultValue) {
//   return (
//     process.env[name] ||
//     defaultValue ||
//     new Error(`missing process.env.${name}`)
//   );
// }

// export default getEnvVar;

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const user = new User();
  user.name = `${firstName} ${lastName}`;
  user.password = faker.random.word();
  return user;
});

// pet.factory.ts
define(Pet, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const name = faker.name.firstName(gender);

  const pet = new Pet();
  pet.name = name;
  pet.age = faker.random.number();
  pet.user = factory(User)() as any;
  return pet;
});

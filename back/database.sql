
CREATE DATABASE africanrecipes_database;

CREATE TYPE user_role AS ENUM ('admin', 'user');

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'user'
);

CREATE TABLE categories(
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE recipes(
  recipes_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(500) NOT NULL,
  ingredients text,
  instructions text,
  category_id INT REFERENCES categories(category_id),
  user_id INT REFERENCES users(user_id)
);

INSERT INTO users(name, email, password, role) VALUES ('NaAstou','naastou1@gmail.com', 'password', 'admin'),
('Mamadou','papemamadou@gmail.com', 'password1', 'user');

INSERT INTO categories(name)VALUES('African');

INSERT INTO recipes(title, image, ingredients, instructions, category_id, user_id) VALUES ('Rice and fish', 'https://img-3.journaldesfemmes.fr/V5E50Bunx2WknCRV01gptCz14y0=/750x500/smart/1dea0eb75e1e4dd490d2a64c2e5928b5/recipe-jdf/394313.jpg','
carrot: 4
white cabbage: 0.5
small eggplants: 6
shallot: 2
peanut oil: 1 tbsp
crushed tomatoes: 400 g of
guedjé: 5 cm
broken rice: 100 g of
magic cube: 1
garlic: 3 cloves
cracked black pepper: 2 tbsp
chicken broth: 50 cl of
tomato concentrate: 2 tbsp
white fish steak: 4
chilli: 1', 'Peel and cut the carrots, cabbage and aubergines into pieces. To book.
Peel and chop the shallots.
Pour the oil into a casserole dish with the shallots, the guedjé and the crushed tomatoes. Add the vegetables. Bring to low heat, cover and cook for 40 minutes.
Then add the fish and cook for 5 minutes.
Scoop out the fish and vegetables using a slotted spoon and keep warm.
Prepare a seasoning by mixing together the garlic, the maggi cube and the pepper to obtain a homogeneous mixture. Add this seasoning to the broth with the tomato puree and the chicken broth.
Mix and pour the rice.
Cover and cook for 25 mins.', 1, 1);
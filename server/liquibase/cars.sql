CREATE TABLE cars (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  model VARCHAR(100),
  year INT,
  current_mileage int
);

insert into cars (name, model, year)
 VALUES
 ('Peugeot Rooms', 'Peugeot 106', 1994),
  ('Peugeot Chloe Deschamps', 'Peugeot 108', 2018),
   ('Van Chloe P', 'Opel', null),
    ('Toyota', 'Toyota Yaris', 2020);

CREATE TABLE mechanics (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT null
);

insert into mechanics (name)
 VALUES ('Jean Papin'),
('Remi Papin'),
('Hugo Perrin');

CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  mileage int,
  date timestamp,
  cars_id int not null,
  mechanics_id int not null,
  CONSTRAINT fk_cars
      FOREIGN KEY(cars_id)
        REFERENCES cars(id),
  CONSTRAINT fk_mechanics
      FOREIGN KEY(mechanics_id)
        REFERENCES mechanics(id)
);

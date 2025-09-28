-- public.task definition

-- Drop table

-- DROP TABLE public.task;

CREATE TABLE public.task (
	id serial4 NOT NULL,
	"name" varchar(100) NOT NULL,
	mileage int4 NULL,
	"date" timestamp NULL,
	cars_id int4 NOT NULL,
	mechanics_id int4 NOT NULL,
	cost decimal(10,2) NULL,
	CONSTRAINT task_pkey PRIMARY KEY (id)
);


-- public.task foreign keys

ALTER TABLE public.task ADD CONSTRAINT fk_cars FOREIGN KEY (cars_id) REFERENCES public.cars(id);
ALTER TABLE public.task ADD CONSTRAINT fk_mechanics FOREIGN KEY (mechanics_id) REFERENCES public.mechanics(id);
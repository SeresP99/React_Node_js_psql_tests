-- we don't know how to generate root <with-no-name> (class Root) :(
create table "user"
(
	user_id integer not null
		constraint user_pk
			primary key,
	user_email varchar
);

alter table "user" owner to postgres;

create table todo
(
	todo_id serial
		constraint todo_pk
			primary key,
	todo_text varchar not null,
	user_id integer
		constraint todo_user_user_id_fk
			references "user"
);

alter table todo owner to postgres;

create unique index user_user_email_uindex
	on "user" (user_email);


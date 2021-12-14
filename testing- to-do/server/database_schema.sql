create table if not exists users
(
    user_id serial
        constraint users_pk
            primary key,
    user_email varchar
);

alter table users owner to postgres;

create unique index if not exists users_user_email_uindex
    on users (user_email);

create table if not exists todo
(
    todo_id serial
        constraint todo_pk
            primary key,
    todo_text varchar not null,
    user_id integer
        constraint todo_user_user_id_fk
            references users
);

alter table todo owner to postgres;


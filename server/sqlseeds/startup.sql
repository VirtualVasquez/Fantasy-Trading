CREATE DATABASE fantasy_stock_trading;

\c fantasy_stock_trading

-- Create sequence
CREATE SEQUENCE IF NOT EXISTS users_user_id_seq;

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;


-- Create sequence
CREATE SEQUENCE IF NOT EXISTS refresh_tokens_id_seq;

-- Table: public.refresh_tokens

-- DROP TABLE IF EXISTS public.refresh_tokens;

CREATE TABLE IF NOT EXISTS public.refresh_tokens
(
    id integer NOT NULL DEFAULT nextval('refresh_tokens_id_seq'::regclass),
    user_id integer NOT NULL,
    token text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id),
    CONSTRAINT refresh_tokens_user_id_key UNIQUE (user_id),
    CONSTRAINT refresh_tokens_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT refresh_tokens_user_id_excl EXCLUDE USING btree (
        user_id WITH =)
);

ALTER TABLE IF EXISTS public.refresh_tokens
    OWNER to postgres;

-- Create sequence
CREATE SEQUENCE IF NOT EXISTS transactions_id_seq;

-- Table: public.transactions

-- DROP TABLE IF EXISTS public.transactions;

CREATE TABLE IF NOT EXISTS public.transactions
(
    id integer NOT NULL DEFAULT nextval('transactions_id_seq'::regclass),
    user_id integer NOT NULL,
    transaction_type character varying(10) COLLATE pg_catalog."default" NOT NULL,
    company_name character varying(255) COLLATE pg_catalog."default",
    nyse_symbol character varying(255) COLLATE pg_catalog."default",
    shares numeric(18,9),
    price numeric(10,2) NOT NULL,
    "timestamp" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT transactions_pkey PRIMARY KEY (id),
    CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT valid_transaction_type CHECK (transaction_type::text = ANY (ARRAY['BUY'::character varying, 'SELL'::character varying, 'DEPOSIT'::character varying, 'WITHDRAWAL'::character varying]::text[]))
);

ALTER TABLE IF EXISTS public.transactions
    OWNER to postgres;
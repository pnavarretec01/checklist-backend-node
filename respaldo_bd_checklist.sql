--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2023-09-14 19:47:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 16399)
-- Name: checklist_efe; Type: SCHEMA; Schema: -; Owner: checklist_efe
--

CREATE SCHEMA checklist_efe;


ALTER SCHEMA checklist_efe OWNER TO checklist_efe;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 16503)
-- Name: CaracteristicaFormulario; Type: TABLE; Schema: checklist_efe; Owner: checklist_efe
--

CREATE TABLE checklist_efe."CaracteristicaFormulario" (
    caracteristica_formulario_id integer NOT NULL,
    item_id integer NOT NULL,
    subitem_id integer NOT NULL,
    pk integer NOT NULL,
    collera character varying(255),
    observacion character varying(255),
    formulario_id integer
);


ALTER TABLE checklist_efe."CaracteristicaFormulario" OWNER TO checklist_efe;

--
-- TOC entry 224 (class 1259 OID 16502)
-- Name: CaracteristicaFormulario_caracteristica_formulario_id_seq; Type: SEQUENCE; Schema: checklist_efe; Owner: checklist_efe
--

CREATE SEQUENCE checklist_efe."CaracteristicaFormulario_caracteristica_formulario_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE checklist_efe."CaracteristicaFormulario_caracteristica_formulario_id_seq" OWNER TO checklist_efe;

--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 224
-- Name: CaracteristicaFormulario_caracteristica_formulario_id_seq; Type: SEQUENCE OWNED BY; Schema: checklist_efe; Owner: checklist_efe
--

ALTER SEQUENCE checklist_efe."CaracteristicaFormulario_caracteristica_formulario_id_seq" OWNED BY checklist_efe."CaracteristicaFormulario".caracteristica_formulario_id;


--
-- TOC entry 223 (class 1259 OID 16449)
-- Name: caracteristicaformulario; Type: TABLE; Schema: checklist_efe; Owner: checklist_efe
--

CREATE TABLE checklist_efe.caracteristicaformulario (
    pk_caracteristica_formulario_id integer NOT NULL,
    fk_formulario_id integer,
    fk_item_id integer,
    fk_subitem_id integer,
    pk integer NOT NULL,
    orden_item integer,
    orden_subitem integer,
    collera character varying(255),
    observacion text
);


ALTER TABLE checklist_efe.caracteristicaformulario OWNER TO checklist_efe;

--
-- TOC entry 222 (class 1259 OID 16448)
-- Name: caracteristicaformulario_caracteristica_formulario_id_seq; Type: SEQUENCE; Schema: checklist_efe; Owner: checklist_efe
--

CREATE SEQUENCE checklist_efe.caracteristicaformulario_caracteristica_formulario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE checklist_efe.caracteristicaformulario_caracteristica_formulario_id_seq OWNER TO checklist_efe;

--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 222
-- Name: caracteristicaformulario_caracteristica_formulario_id_seq; Type: SEQUENCE OWNED BY; Schema: checklist_efe; Owner: checklist_efe
--

ALTER SEQUENCE checklist_efe.caracteristicaformulario_caracteristica_formulario_id_seq OWNED BY checklist_efe.caracteristicaformulario.pk_caracteristica_formulario_id;


--
-- TOC entry 217 (class 1259 OID 16401)
-- Name: formulario; Type: TABLE; Schema: checklist_efe; Owner: checklist_efe
--

CREATE TABLE checklist_efe.formulario (
    pk_formulario_id integer NOT NULL,
    nombre_supervisor character varying(255) NOT NULL,
    fecha date NOT NULL,
    subdivision character varying(255) NOT NULL,
    observacion_general character varying(255),
    pk_inicio integer NOT NULL,
    pk_termino integer NOT NULL,
    cerrado boolean,
    fk_subdivision_id integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);


ALTER TABLE checklist_efe.formulario OWNER TO checklist_efe;

--
-- TOC entry 216 (class 1259 OID 16400)
-- Name: formulario_pk_formulario_id_seq; Type: SEQUENCE; Schema: checklist_efe; Owner: checklist_efe
--

CREATE SEQUENCE checklist_efe.formulario_pk_formulario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE checklist_efe.formulario_pk_formulario_id_seq OWNER TO checklist_efe;

--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 216
-- Name: formulario_pk_formulario_id_seq; Type: SEQUENCE OWNED BY; Schema: checklist_efe; Owner: checklist_efe
--

ALTER SEQUENCE checklist_efe.formulario_pk_formulario_id_seq OWNED BY checklist_efe.formulario.pk_formulario_id;


--
-- TOC entry 219 (class 1259 OID 16430)
-- Name: item; Type: TABLE; Schema: checklist_efe; Owner: checklist_efe
--

CREATE TABLE checklist_efe.item (
    pk_item_id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    orden integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);


ALTER TABLE checklist_efe.item OWNER TO checklist_efe;

--
-- TOC entry 218 (class 1259 OID 16429)
-- Name: item_pk_item_id_seq; Type: SEQUENCE; Schema: checklist_efe; Owner: checklist_efe
--

CREATE SEQUENCE checklist_efe.item_pk_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE checklist_efe.item_pk_item_id_seq OWNER TO checklist_efe;

--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 218
-- Name: item_pk_item_id_seq; Type: SEQUENCE OWNED BY; Schema: checklist_efe; Owner: checklist_efe
--

ALTER SEQUENCE checklist_efe.item_pk_item_id_seq OWNED BY checklist_efe.item.pk_item_id;


--
-- TOC entry 227 (class 1259 OID 16532)
-- Name: subdivision_pk_subdivision_id_seq; Type: SEQUENCE; Schema: checklist_efe; Owner: postgres
--

CREATE SEQUENCE checklist_efe.subdivision_pk_subdivision_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE checklist_efe.subdivision_pk_subdivision_id_seq OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16526)
-- Name: subdivision; Type: TABLE; Schema: checklist_efe; Owner: postgres
--

CREATE TABLE checklist_efe.subdivision (
    pk_subdivision_id integer DEFAULT nextval('checklist_efe.subdivision_pk_subdivision_id_seq'::regclass) NOT NULL,
    nombre character varying(255) NOT NULL,
    pk_inicio integer NOT NULL,
    pk_termino integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE checklist_efe.subdivision OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16545)
-- Name: subidivision; Type: TABLE; Schema: checklist_efe; Owner: postgres
--

CREATE TABLE checklist_efe.subidivision (
    pk_subdivision_id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    pk_inicio integer NOT NULL,
    pk_termino integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE checklist_efe.subidivision OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16544)
-- Name: subidivision_pk_subdivision_id_seq; Type: SEQUENCE; Schema: checklist_efe; Owner: postgres
--

CREATE SEQUENCE checklist_efe.subidivision_pk_subdivision_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE checklist_efe.subidivision_pk_subdivision_id_seq OWNER TO postgres;

--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 228
-- Name: subidivision_pk_subdivision_id_seq; Type: SEQUENCE OWNED BY; Schema: checklist_efe; Owner: postgres
--

ALTER SEQUENCE checklist_efe.subidivision_pk_subdivision_id_seq OWNED BY checklist_efe.subidivision.pk_subdivision_id;


--
-- TOC entry 221 (class 1259 OID 16437)
-- Name: subitem; Type: TABLE; Schema: checklist_efe; Owner: checklist_efe
--

CREATE TABLE checklist_efe.subitem (
    pk_subitem_id integer NOT NULL,
    fk_item_id integer,
    nombre character varying(255) NOT NULL,
    orden integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);


ALTER TABLE checklist_efe.subitem OWNER TO checklist_efe;

--
-- TOC entry 220 (class 1259 OID 16436)
-- Name: subitem_pk_subitem_id_seq; Type: SEQUENCE; Schema: checklist_efe; Owner: checklist_efe
--

CREATE SEQUENCE checklist_efe.subitem_pk_subitem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE checklist_efe.subitem_pk_subitem_id_seq OWNER TO checklist_efe;

--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 220
-- Name: subitem_pk_subitem_id_seq; Type: SEQUENCE OWNED BY; Schema: checklist_efe; Owner: checklist_efe
--

ALTER SEQUENCE checklist_efe.subitem_pk_subitem_id_seq OWNED BY checklist_efe.subitem.pk_subitem_id;


--
-- TOC entry 3215 (class 2604 OID 16506)
-- Name: CaracteristicaFormulario caracteristica_formulario_id; Type: DEFAULT; Schema: checklist_efe; Owner: checklist_efe
--

ALTER TABLE ONLY checklist_efe."CaracteristicaFormulario" ALTER COLUMN caracteristica_formulario_id SET DEFAULT nextval('checklist_efe."CaracteristicaFormulario_caracteristica_formulario_id_seq"'::regclass);


--
-- TOC entry 3214 (class 2604 OID 16452)
-- Name: caracteristicaformulario pk_caracteristica_formulario_id; Type: DEFAULT; Schema: checklist_efe; Owner: checklist_efe
--

ALTER TABLE ONLY checklist_efe.caracteristicaformulario ALTER COLUMN pk_caracteristica_formulario_id SET DEFAULT nextval('checklist_efe.caracteristicaformulario_caracteristica_formulario_id_seq'::regclass);


--
-- TOC entry 3205 (class 2604 OID 16404)
-- Name: formulario pk_formulario_id; Type: DEFAULT; Schema: checklist_efe; Owner: checklist_efe
--

ALTER TABLE ONLY checklist_efe.formulario ALTER COLUMN pk_formulario_id SET DEFAULT nextval('checklist_efe.formulario_pk_formulario_id_seq'::regclass);


--
-- TOC entry 3208 (class 2604 OID 16433)
-- Name: item pk_item_id; Type: DEFAULT; Schema: checklist_efe; Owner: checklist_efe
--

ALTER TABLE ONLY checklist_efe.item ALTER COLUMN pk_item_id SET DEFAULT nextval('checklist_efe.item_pk_item_id_seq'::regclass);


--
-- TOC entry 3219 (class 2604 OID 16548)
-- Name: subidivision pk_subdivision_id; Type: DEFAULT; Schema: checklist_efe; Owner: postgres
--

ALTER TABLE ONLY checklist_efe.subidivision ALTER COLUMN pk_subdivision_id SET DEFAULT nextval('checklist_efe.subidivision_pk_subdivision_id_seq'::regclass);


--
-- TOC entry 3211 (class 2604 OID 16440)
-- Name: subitem pk_subitem_id; Type: DEFAULT; Schema: checklist_efe; Owner: checklist_efe
--

ALTER TABLE ONLY checklist_efe.subitem ALTER COLUMN pk_subitem_id SET DEFAULT nextval('checklist_efe.subitem_pk_subitem_id_seq'::regclass);


--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 227
-- Name: SEQUENCE subdivision_pk_subdivision_id_seq; Type: ACL; Schema: checklist_efe; Owner: postgres
--

GRANT ALL ON SEQUENCE checklist_efe.subdivision_pk_subdivision_id_seq TO checklist_efe;


--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 226
-- Name: TABLE subdivision; Type: ACL; Schema: checklist_efe; Owner: postgres
--

GRANT ALL ON TABLE checklist_efe.subdivision TO checklist_efe;


-- Completed on 2023-09-14 19:47:20

--
-- PostgreSQL database dump complete
--


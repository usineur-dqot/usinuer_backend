import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';

export interface usersAttributes {
  id: number;
  refid: string;
  country_code?: number;
  user_name?: string;
  name: string;
  surname: string;
  address1?: string;
  address2?: string;
  description?: string;
  company_name?: string;
  company_number?: string;
  role_id: number;
  password?: string;
  email: string;
  paypal_email?: string;
  profile_desc?: string;
  service_desc?: string;
  voter?: string;
  prof_pic?: string;
  prot_pic?: string;
  pdf_file?: string;
  account?: string;
  user_status: number;
  activation_key?: string;
  zcode?: string;
  Squestion?: string;
  answer?: string;
  state?: string;
  city?: string;
  country_symbol?: string;
  project_notify?: string;
  bid_notify?: string;
  message_notify?: string;
  rate?: number;
  logo?: string;
  created?: number;
  last_activity?: number;
  user_rating?: number;
  num_reviews?: number;
  rating_hold?: number;
  tot_rating?: number;
  suspend_status: '0' | '1';
  ban_status: '0' | '1';
  admin_status?: string;
  admin_status_uk?: string;
  admin_status_it?: string;
  job_fr?: number;
  job_uk?: number;
  job_it?: number;
  choice?: number;
  supLogin?: string;
  lang?: string;
  pro_user: number;
  pro_vat?: number;
  siren?: string;
  mailchimp_id?: string;
  nxtduedate?: string;
  entrepreneur?: number;
  bid_status: number;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "refid" | "country_code" | "user_name" | "address1" | "address2" | "description" | "company_name" | "company_number" | "password" | "paypal_email" | "profile_desc" | "service_desc" | "voter" | "prof_pic" | "prot_pic" | "pdf_file" | "account" | "user_status" | "activation_key" | "zcode" | "Squestion" | "answer" | "state" | "city" | "country_symbol" | "project_notify" | "bid_notify" | "message_notify" | "rate" | "logo" | "created" | "last_activity" | "user_rating" | "num_reviews" | "rating_hold" | "tot_rating" | "suspend_status" | "ban_status" | "admin_status" | "admin_status_uk" | "admin_status_it" | "job_fr" | "job_uk" | "job_it" | "choice" | "supLogin" | "lang" | "pro_user" | "pro_vat" | "siren" | "mailchimp_id" | "nxtduedate" | "entrepreneur" | "bid_status";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  refid!: string;
  country_code?: number;
  user_name?: string;
  name!: string;
  surname!: string;
  address1?: string;
  address2?: string;
  description?: string;
  company_name?: string;
  company_number?: string;
  role_id!: number;
  password?: string;
  email!: string;
  paypal_email?: string;
  profile_desc?: string;
  service_desc?: string;
  voter?: string;
  prof_pic?: string;
  prot_pic?: string;
  pdf_file?: string;
  account?: string;
  user_status!: number;
  activation_key?: string;
  zcode?: string;
  Squestion?: string;
  answer?: string;
  state?: string;
  city?: string;
  country_symbol?: string;
  project_notify?: string;
  bid_notify?: string;
  message_notify?: string;
  rate?: number;
  logo?: string;
  created?: number;
  last_activity?: number;
  user_rating?: number;
  num_reviews?: number;
  rating_hold?: number;
  tot_rating?: number;
  suspend_status!: '0' | '1';
  ban_status!: '0' | '1';
  admin_status?: string;
  admin_status_uk?: string;
  admin_status_it?: string;
  job_fr?: number;
  job_uk?: number;
  job_it?: number;
  choice?: number;
  supLogin?: string;
  lang?: string;
  pro_user!: number;
  pro_vat?: number;
  siren?: string;
  mailchimp_id?: string;
  nxtduedate?: string;
  entrepreneur?: number;
  bid_status!: number;

  // users hasMany projects via creator_id
  projects!: projects[];
  getProjects!: Sequelize.HasManyGetAssociationsMixin<projects>;
  setProjects!: Sequelize.HasManySetAssociationsMixin<projects, projectsId>;
  addProject!: Sequelize.HasManyAddAssociationMixin<projects, projectsId>;
  addProjects!: Sequelize.HasManyAddAssociationsMixin<projects, projectsId>;
  createProject!: Sequelize.HasManyCreateAssociationMixin<projects>;
  removeProject!: Sequelize.HasManyRemoveAssociationMixin<projects, projectsId>;
  removeProjects!: Sequelize.HasManyRemoveAssociationsMixin<projects, projectsId>;
  hasProject!: Sequelize.HasManyHasAssociationMixin<projects, projectsId>;
  hasProjects!: Sequelize.HasManyHasAssociationsMixin<projects, projectsId>;
  countProjects!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    refid: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: "0"
    },
    country_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    company_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    paypal_email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    profile_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    service_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    voter: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prof_pic: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    prot_pic: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pdf_file: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    account: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    activation_key: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    zcode: {
      type: DataTypes.CHAR(100),
      allowNull: true
    },
    Squestion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    answer: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    country_symbol: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    project_notify: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    bid_notify: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    message_notify: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    rate: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    last_activity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_rating: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    num_reviews: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rating_hold: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tot_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    suspend_status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "0"
    },
    ban_status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "0"
    },
    admin_status: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    admin_status_uk: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    admin_status_it: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    job_fr: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    job_uk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    job_it: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    choice: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    supLogin: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lang: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    pro_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    pro_vat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    siren: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mailchimp_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nxtduedate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    entrepreneur: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "0=>Not Entrepreneur and 1 => Entrepreneur"
    },
    bid_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "0=>Not able to bid and 1 => able to bid"
    }
  }, {
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof users;
  }
}

import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface usersAttributes {
  id: number;
  refid: string;
  country_code: number;
  user_name?: string;
  name: string;
  surname: string;
  address1: string;
  address2: string;
  description: string;
  company_name: string;
  company_number: string;
  role_id: number;
  password?: string;
  email: string;
  paypal_email: string;
  profile_desc?: string;
  service_desc: string;
  voter: string;
  prof_pic: string;
  prot_pic: string;
  pdf_file: string;
  account: string;
  user_status: number;
  activation_key: string;
  zcode: string;
  Squestion: string;
  answer: string;
  state?: string;
  city?: string;
  country_symbol: string;
  project_notify?: string;
  bid_notify?: string;
  message_notify: string;
  rate?: number;
  logo?: string;
  created: number;
  last_activity: number;
  user_rating: number;
  num_reviews: number;
  rating_hold: number;
  tot_rating: number;
  suspend_status: '0' | '1';
  ban_status: '0' | '1';
  admin_status: string;
  admin_status_uk: string;
  admin_status_it: string;
  job_fr: number;
  job_uk: number;
  job_it: number;
  choice: number;
  supLogin: string;
  lang: string;
  pro_user: number;
  pro_vat: number;
  siren: string;
  mailchimp_id: string;
  nxtduedate: string;
  entrepreneur: number;
  bid_status: number;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "refid" | "user_name" | "password" | "profile_desc" | "user_status" | "state" | "city" | "project_notify" | "bid_notify" | "rate" | "logo" | "suspend_status" | "ban_status" | "pro_user" | "bid_status";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  refid!: string;
  country_code!: number;
  user_name?: string;
  name!: string;
  surname!: string;
  address1!: string;
  address2!: string;
  description!: string;
  company_name!: string;
  company_number!: string;
  role_id!: number;
  password?: string;
  email!: string;
  paypal_email!: string;
  profile_desc?: string;
  service_desc!: string;
  voter!: string;
  prof_pic!: string;
  prot_pic!: string;
  pdf_file!: string;
  account!: string;
  user_status!: number;
  activation_key!: string;
  zcode!: string;
  Squestion!: string;
  answer!: string;
  state?: string;
  city?: string;
  country_symbol!: string;
  project_notify?: string;
  bid_notify?: string;
  message_notify!: string;
  rate?: number;
  logo?: string;
  created!: number;
  last_activity!: number;
  user_rating!: number;
  num_reviews!: number;
  rating_hold!: number;
  tot_rating!: number;
  suspend_status!: '0' | '1';
  ban_status!: '0' | '1';
  admin_status!: string;
  admin_status_uk!: string;
  admin_status_it!: string;
  job_fr!: number;
  job_uk!: number;
  job_it!: number;
  choice!: number;
  supLogin!: string;
  lang!: string;
  pro_user!: number;
  pro_vat!: number;
  siren!: string;
  mailchimp_id!: string;
  nxtduedate!: string;
  entrepreneur!: number;
  bid_status!: number;


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
      allowNull: false
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
      allowNull: false
    },
    address2: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    company_number: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    paypal_email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    profile_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    service_desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    voter: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    prof_pic: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    prot_pic: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pdf_file: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    account: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    user_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    activation_key: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    zcode: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    Squestion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    answer: {
      type: DataTypes.STRING(100),
      allowNull: false
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
      allowNull: false
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
      allowNull: false
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
      allowNull: false
    },
    last_activity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_rating: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    num_reviews: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating_hold: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tot_rating: {
      type: DataTypes.INTEGER,
      allowNull: false
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
      allowNull: false
    },
    admin_status_uk: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    admin_status_it: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    job_fr: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    job_uk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    job_it: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    choice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    supLogin: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lang: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    pro_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    pro_vat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    siren: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mailchimp_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nxtduedate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    entrepreneur: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

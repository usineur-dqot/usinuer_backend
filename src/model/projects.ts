import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface projectsAttributes {
  id: number;
  project_name: string;
  project_status: string;
  buyer_complete_status: number;
  provider_complete_status: number;
  description: string;
  expedition_day: string;
  expedition_day2: string;
  track_number: string;
  additional_description: string;
  project_image: string;
  project_categories: string;
  project_start: number;
  visibility: string;
  start_bid: number;
  budget_min?: number;
  budget_max?: number;
  is_feature?: number;
  is_urgent?: number;
  is_hide_bids?: number;
  creator_id: number;
  created: number;
  enddate: number;
  programmer_id: number;
  bid_select_date: Date;
  unpaid_project_notify_date: Date;
  checkstamp: string;
  buyer_rated: '0' | '1';
  provider_rated: '0' | '1';
  project_paid: '0' | '1';
  project_award_date: number;
  project_award_date_format: Date;
  project_fund_date_format: Date;
  fund_release_date: Date;
  notification_status: number;
  attachment_url: string;
  image: string;
  first_upload: number;
  attachment_name?: string;
  attachment_folder: string;
  is_private: number;
  private_users?: string;
  contact: string;
  salary: string;
  flag: number;
  salarytype: string;
  escrow_due: number;
  city: string;
  zipcode: string;
  post_for: string;
  project_post_format_date: Date;
  project_post_date: string;
  project_expiry_date: string;
  expired_notification_sent: string;
  fund_notification_sent: string;
  unpaid_project_notif: string;
  site_fr: number;
  site_uk: number;
  site_it: number;
  country_code: number;
  pro_job: number;
}

export type projectsPk = "id";
export type projectsId = projects[projectsPk];
export type projectsOptionalAttributes = "id" | "project_status" | "budget_min" | "budget_max" | "is_feature" | "is_urgent" | "is_hide_bids" | "notification_status" | "attachment_name" | "is_private" | "private_users" | "expired_notification_sent" | "fund_notification_sent";
export type projectsCreationAttributes = Optional<projectsAttributes, projectsOptionalAttributes>;

export class projects extends Model<projectsAttributes, projectsCreationAttributes> implements projectsAttributes {
  id!: number;
  project_name!: string;
  project_status!: string;
  buyer_complete_status!: number;
  provider_complete_status!: number;
  description!: string;
  expedition_day!: string;
  expedition_day2!: string;
  track_number!: string;
  additional_description!: string;
  project_image!: string;
  project_categories!: string;
  project_start!: number;
  visibility!: string;
  start_bid!: number;
  budget_min?: number;
  budget_max?: number;
  is_feature?: number;
  is_urgent?: number;
  is_hide_bids?: number;
  creator_id!: number;
  created!: number;
  enddate!: number;
  programmer_id!: number;
  bid_select_date!: Date;
  unpaid_project_notify_date!: Date;
  checkstamp!: string;
  buyer_rated!: '0' | '1';
  provider_rated!: '0' | '1';
  project_paid!: '0' | '1';
  project_award_date!: number;
  project_award_date_format!: Date;
  project_fund_date_format!: Date;
  fund_release_date!: Date;
  notification_status!: number;
  attachment_url!: string;
  image!: string;
  first_upload!: number;
  attachment_name?: string;
  attachment_folder!: string;
  is_private!: number;
  private_users?: string;
  contact!: string;
  salary!: string;
  flag!: number;
  salarytype!: string;
  escrow_due!: number;
  city!: string;
  zipcode!: string;
  post_for!: string;
  project_post_format_date!: Date;
  project_post_date!: string;
  project_expiry_date!: string;
  expired_notification_sent!: string;
  fund_notification_sent!: string;
  unpaid_project_notif!: string;
  site_fr!: number;
  site_uk!: number;
  site_it!: number;
  country_code!: number;
  pro_job!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof projects {
    return sequelize.define('projects', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    project_status: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "0"
    },
    buyer_complete_status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    provider_complete_status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expedition_day: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    expedition_day2: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    track_number: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    additional_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    project_image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    project_categories: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    project_start: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    visibility: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    start_bid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    budget_min: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 0
    },
    budget_max: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 0
    },
    is_feature: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_urgent: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_hide_bids: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    creator_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    enddate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programmer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bid_select_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    unpaid_project_notify_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    checkstamp: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    buyer_rated: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false
    },
    provider_rated: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false
    },
    project_paid: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false
    },
    project_award_date: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_award_date_format: {
      type: DataTypes.DATE,
      allowNull: false
    },
    project_fund_date_format: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fund_release_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    notification_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    attachment_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    first_upload: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attachment_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attachment_folder: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    is_private: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    private_users: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contact: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    salary: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    flag: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    salarytype: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    escrow_due: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    post_for: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    project_post_format_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    project_post_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    project_expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    expired_notification_sent: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "N"
    },
    fund_notification_sent: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "N"
    },
    unpaid_project_notif: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    site_fr: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    site_uk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    site_it: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    country_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pro_job: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'projects',
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
  }) as typeof projects;
  }
}

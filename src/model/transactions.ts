import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface transactionsAttributes {
  id: number;
  type: string;
  creator_id: number;
  buyer_id: number;
  provider_id: number;
  transaction_time: number;
  amount: number;
  amount_gbp: number;
  status?: string;
  description: string;
  paypal_address?: string;
  user_type?: string;
  reciever_id: string;
  project_id: string;
  package_id?: number;
  update_flag?: number;
  country_code?: number;
}

export type transactionsPk = "id";
export type transactionsId = transactions[transactionsPk];
export type transactionsOptionalAttributes = "id" | "creator_id" | "buyer_id" | "provider_id" | "status" | "paypal_address" | "user_type" | "package_id" | "update_flag" | "country_code";
export type transactionsCreationAttributes = Optional<transactionsAttributes, transactionsOptionalAttributes>;

export class transactions extends Model<transactionsAttributes, transactionsCreationAttributes> implements transactionsAttributes {
  id!: number;
  type!: string;
  creator_id!: number;
  buyer_id!: number;
  provider_id!: number;
  transaction_time!: number;
  amount!: number;
  amount_gbp!: number;
  status?: string;
  description!: string;
  paypal_address?: string;
  user_type?: string;
  reciever_id!: string;
  project_id!: string;
  package_id?: number;
  update_flag?: number;
  country_code?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof transactions {
    return sequelize.define('transactions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    provider_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    transaction_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    amount_gbp: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.CHAR(16),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    paypal_address: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    user_type: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    reciever_id: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    project_id: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    package_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    update_flag: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    country_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'transactions',
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
  }) as typeof transactions;
  }
}

import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface bidsAttributes {
  id: number;
  project_id: number;
  user_id: number;
  bid_days: number;
  bid_hours: number;
  bid_file: string;
  bid_amount: number;
  bid_amount_gbp: number;
  bid_time: number;
  bid_desc: string;
  lowbid_notify: '0' | '1';
  escrow_flag: number;
  no_offer: number;
}

export type bidsPk = "id";
export type bidsId = bids[bidsPk];
export type bidsOptionalAttributes = "id";
export type bidsCreationAttributes = Optional<bidsAttributes, bidsOptionalAttributes>;

export class bids extends Model<bidsAttributes, bidsCreationAttributes> implements bidsAttributes {
  id!: number;
  project_id!: number;
  user_id!: number;
  bid_days!: number;
  bid_hours!: number;
  bid_file!: string;
  bid_amount!: number;
  bid_amount_gbp!: number;
  bid_time!: number;
  bid_desc!: string;
  lowbid_notify!: '0' | '1';
  escrow_flag!: number;
  no_offer!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof bids {
    return sequelize.define('bids', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bid_days: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bid_hours: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bid_file: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bid_amount: {
      type: DataTypes.MEDIUMINT,
      allowNull: false
    },
    bid_amount_gbp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bid_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bid_desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lowbid_notify: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false
    },
    escrow_flag: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    no_offer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "1=offer, 2=Blank offer"
    }
  }, {
    tableName: 'bids',
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
  }) as typeof bids;
  }
}

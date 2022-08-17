import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface reviewsAttributes {
  id: number;
  comments: string;
  rating: number;
  provider_rate1: number;
  provider_rate2: number;
  provider_rate3: number;
  provider_rate4: number;
  provider_rate5: number;
  provider_rate6: number;
  provider_rating_avg: number;
  emp_rate1: number;
  emp_rate2: number;
  emp_rate3: number;
  emp_rate4: number;
  emp_rate5: number;
  emp_rate6: number;
  emp_rating_avg: number;
  review_time: number;
  review_post_date: Date;
  review_type: '1' | '2';
  project_id: number;
  buyer_id: number;
  provider_id: number;
  hold: '0' | '1';
  buyer_status: string;
  provider_status: string;
  country_code: number;
}

export type reviewsPk = "id";
export type reviewsId = reviews[reviewsPk];
export type reviewsOptionalAttributes = "id";
export type reviewsCreationAttributes = Optional<reviewsAttributes, reviewsOptionalAttributes>;

export class reviews extends Model<reviewsAttributes, reviewsCreationAttributes> implements reviewsAttributes {
  id!: number;
  comments!: string;
  rating!: number;
  provider_rate1!: number;
  provider_rate2!: number;
  provider_rate3!: number;
  provider_rate4!: number;
  provider_rate5!: number;
  provider_rate6!: number;
  provider_rating_avg!: number;
  emp_rate1!: number;
  emp_rate2!: number;
  emp_rate3!: number;
  emp_rate4!: number;
  emp_rate5!: number;
  emp_rate6!: number;
  emp_rating_avg!: number;
  review_time!: number;
  review_post_date!: Date;
  review_type!: '1' | '2';
  project_id!: number;
  buyer_id!: number;
  provider_id!: number;
  hold!: '0' | '1';
  buyer_status!: string;
  provider_status!: string;
  country_code!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof reviews {
    return sequelize.define('reviews', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    provider_rate1: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    provider_rate2: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    provider_rate3: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    provider_rate4: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    provider_rate5: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    provider_rate6: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    provider_rating_avg: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    emp_rate1: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    emp_rate2: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    emp_rate3: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    emp_rate4: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    emp_rate5: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    emp_rate6: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    emp_rating_avg: {
      type: DataTypes.FLOAT(2,1),
      allowNull: false
    },
    review_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review_post_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    review_type: {
      type: DataTypes.ENUM('1','2'),
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hold: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false
    },
    buyer_status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    provider_status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    country_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'reviews',
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
  }) as typeof reviews;
  }
}

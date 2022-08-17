import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface countryAttributes {
  id: number;
  country_symbol: string;
  country_name: string;
}

export type countryPk = "id";
export type countryId = country[countryPk];
export type countryOptionalAttributes = "id";
export type countryCreationAttributes = Optional<countryAttributes, countryOptionalAttributes>;

export class country extends Model<countryAttributes, countryCreationAttributes> implements countryAttributes {
  id!: number;
  country_symbol!: string;
  country_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof country {
    return sequelize.define('country', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    country_symbol: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    country_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'country',
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
  }) as typeof country;
  }
}

import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface messagesAttributes {
  id: number;
  project_id: number;
  reply_for: number;
  from_id: number;
  to_id: number;
  buyer_message_status: string;
  programmer_message_status: string;
  provider_delete_status: string;
  buyer_delete_status: string;
  message: string;
  created: number;
  notification_status: string;
  deluserid: string;
  attach_file: string;
  approve: number;
}

export type messagesPk = "id";
export type messagesId = messages[messagesPk];
export type messagesOptionalAttributes = "id" | "notification_status";
export type messagesCreationAttributes = Optional<messagesAttributes, messagesOptionalAttributes>;

export class messages extends Model<messagesAttributes, messagesCreationAttributes> implements messagesAttributes {
  id!: number;
  project_id!: number;
  reply_for!: number;
  from_id!: number;
  to_id!: number;
  buyer_message_status!: string;
  programmer_message_status!: string;
  provider_delete_status!: string;
  buyer_delete_status!: string;
  message!: string;
  created!: number;
  notification_status!: string;
  deluserid!: string;
  attach_file!: string;
  approve!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof messages {
    return sequelize.define('messages', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    reply_for: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    from_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    to_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buyer_message_status: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    programmer_message_status: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    provider_delete_status: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    buyer_delete_status: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notification_status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "0",
      comment: "P=\"Prebid\",N=\"Notifications\""
    },
    deluserid: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    attach_file: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    approve: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'messages',
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
  }) as typeof messages;
  }
}

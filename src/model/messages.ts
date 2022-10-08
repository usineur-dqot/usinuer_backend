import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface messagesAttributes {
  id: number;
  project_id: number;
  reply_for?: number;
  from_id: number;
  to_id: number;
  buyer_message_status?: string;
  programmer_message_status?: string;
  provider_delete_status?: string;
  buyer_delete_status?: string;
  message: string;
  created: number;
  notification_status?: string;
  deluserid?: string;
  attach_file?: string;
  approve?: number;
}

export type messagesPk = "id";
export type messagesId = messages[messagesPk];
export type messagesOptionalAttributes = "id" | "reply_for" | "buyer_message_status" | "programmer_message_status" | "provider_delete_status" | "buyer_delete_status" | "notification_status" | "deluserid" | "attach_file" | "approve";
export type messagesCreationAttributes = Optional<messagesAttributes, messagesOptionalAttributes>;

export class messages extends Model<messagesAttributes, messagesCreationAttributes> implements messagesAttributes {
  id!: number;
  project_id!: number;
  reply_for?: number;
  from_id!: number;
  to_id!: number;
  buyer_message_status?: string;
  programmer_message_status?: string;
  provider_delete_status?: string;
  buyer_delete_status?: string;
  message!: string;
  created!: number;
  notification_status?: string;
  deluserid?: string;
  attach_file?: string;
  approve?: number;


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
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    from_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    to_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buyer_message_status: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    programmer_message_status: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    provider_delete_status: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    buyer_delete_status: {
      type: DataTypes.CHAR(1),
      allowNull: true
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
      allowNull: true,
      defaultValue: "0",
      comment: "P=\"Prebid\",N=\"Notifications\""
    },
    deluserid: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attach_file: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    approve: {
      type: DataTypes.INTEGER,
      allowNull: true
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

import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface prebid_messagesAttributes {
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
  msg_type: string;
}

export type prebid_messagesPk = "id";
export type prebid_messagesId = prebid_messages[prebid_messagesPk];
export type prebid_messagesOptionalAttributes = "id" | "notification_status";
export type prebid_messagesCreationAttributes = Optional<prebid_messagesAttributes, prebid_messagesOptionalAttributes>;

export class prebid_messages extends Model<prebid_messagesAttributes, prebid_messagesCreationAttributes> implements prebid_messagesAttributes {
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
  msg_type!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof prebid_messages {
    return sequelize.define('prebid_messages', {
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
    msg_type: {
      type: DataTypes.CHAR(1),
      allowNull: false
    }
  }, {
    tableName: 'prebid_messages',
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
  }) as typeof prebid_messages;
  }
}

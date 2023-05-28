package com.pr.golf.golfapp.standalone;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

public class InsertStatementGenerator {
    private static final String DB_URL = "jdbc:mariadb://localhost:3306/golfapp";
    private static final String DB_USERNAME = "pronane";
    private static final String DB_PASSWORD = "password";
    private static final String OUTPUT_FILE_PATH = "insert_statements.sql";

    public static void main(String[] args) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
             PrintWriter writer = new PrintWriter(new FileWriter(OUTPUT_FILE_PATH))) {
            generateInsertStatements(connection, writer);
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    private static void generateInsertStatements(Connection connection, PrintWriter writer) throws SQLException {
        generateInsertStatementsForTable(connection, writer, "competition");
        generateInsertStatementsForTable(connection, writer, "golf_course");
        generateInsertStatementsForTable(connection, writer, "player");
        generateInsertStatementsForTable(connection, writer, "hole");
        generateInsertStatementsForTable(connection, writer, "golf_event");
        generateInsertStatementsForTable(connection, writer, "player_grouping");
        generateInsertStatementsForTable(connection, writer, "golf_event_player");
        generateInsertStatementsForTable(connection, writer, "competition_player");
        generateInsertStatementsForTable(connection, writer, "golf_leader_board");
        generateInsertStatementsForTable(connection, writer, "score");
    }

    private static void generateInsertStatementsForTable(Connection connection, PrintWriter writer, String tableName)
            throws SQLException {
        String sql = "SELECT * FROM " + tableName;
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                StringBuilder insertStatement = new StringBuilder();
                insertStatement.append("INSERT INTO ").append(tableName).append(" (");

                ResultSetMetaData metaData = resultSet.getMetaData();
                int columnCount = metaData.getColumnCount();
                for (int i = 1; i <= columnCount; i++) {
                    insertStatement.append(metaData.getColumnName(i));
                    if (i < columnCount) {
                        insertStatement.append(", ");
                    }
                }

                insertStatement.append(") VALUES (");

                for (int i = 1; i <= columnCount; i++) {
                    Object value = resultSet.getObject(i);
                    if (value != null) {
                        insertStatement.append(formatValue(value));
                    } else {
                        insertStatement.append("NULL");
                    }
                    if (i < columnCount) {
                        insertStatement.append(", ");
                    }
                }

                insertStatement.append(");");
                writer.println(insertStatement.toString());
            }
        }
    }

    private static String formatValue(Object value) {
        if (value instanceof String) {
            String formattedValue = value.toString().replace("'", "''");
            return "'" + formattedValue + "'";
        }
        return value.toString();
    }
}

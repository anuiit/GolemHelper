from mysql.connector import connect, Error

def insert_game_data(connection, game_id, duration, patch, datetime, winner):
    try:
        cursor = connection.cursor()
        query = """
        INSERT INTO game_data (game_id, duration, patch, datetime, winner)
        VALUES (%s, %s, %s, %s, %s);
        """
        cursor.execute(query, (game_id, duration, patch, datetime, winner))
        connection.commit()
        print("Game data inserted successfully")
    except Error as e:
        print(f"The error '{e}' occurred")

def insert_player_stats(connection, game_id, puuid, championId, teamPosition, winrateChampionPercentage, mainRole, mainRolePercentage, teamPositionPercentage, team):
    try:
        cursor = connection.cursor()
        query = """
        INSERT INTO player_stats (game_id, puuid, championId, teamPosition, winrateChampionPercentage, mainRole, mainRolePercentage, teamPositionPercentage, team)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
        """
        cursor.execute(query, (game_id, puuid, championId, teamPosition, winrateChampionPercentage, mainRole, mainRolePercentage, teamPositionPercentage, team))
        connection.commit()
        print("Player stats inserted successfully")
    except Error as e:
        print(f"The error '{e}' occurred")

def update_computer_status(connection, id, status):
    try:
        cursor = connection.cursor()
        query = """
        UPDATE status
        SET status = %s
        WHERE id = %s;
        """
        cursor.execute(query, (status, id))
        connection.commit()
        print("Computer status updated successfully")
    except Error as e:
        print(f"The error '{e}' occurred")
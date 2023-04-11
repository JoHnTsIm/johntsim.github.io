import sqlite3
from sqlite3 import Error

def connectDb():
    try:
        connection = sqlite3.connect('database.db')
        return connection
    except Error as error:
        print(f"ERROR: {error}")

def create_cursor(connection: sqlite3.Connection):
    try:
        cursor = connection.cursor()
        return cursor
    except Error as error:
        print(f"ERROR: {error}")

def create_table_free_games(cursor: sqlite3.Cursor):
    try:
        cursor.execute("""CREATE TABLE IF NOT EXISTS free_games(
        gameId INTEGER PRIMARY KEY,
        gameName VARCHAR(255) NOT NULL,
        gameImage VARCHAR(500) NOT NULL,
        gamePage VARCHAR(500) NOT NULL,
        gameFreePeriod VARCHAR(255) NOT NULL
        )""")
    except Error as error:
        print(f"ERROR: {error}")


if __name__ == "__main__":
    con = connectDb()
    cur = create_cursor(con)
    create_table_free_games(cur)



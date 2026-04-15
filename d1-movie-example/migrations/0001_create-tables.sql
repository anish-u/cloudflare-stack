-- Migration number: 0001 	 2026-04-15T06:56:25.394Z

-- table: movie
-- columns:
-- - id: INTEGER, PRIMARY KEY, AUTOINCREMENT
-- - title: TEXT, NOT NULL
-- - release_date: TEXT, NOT NULL
-- - rating: (1-5) INTEGER, NOT NULL

DROP TABLE IF EXISTS "movie";

CREATE TABLE "movie" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "rating" INTEGER NOT NULL
);
-- CREATE TABLE IF NOT EXISTS user (
--     user_id      SERIAL PRIMARY KEY,
--     email         UNIQUE NOT NULL,
--     username     VARCHAR(256) UNIQUE NOT NULL,
--     password     VARCHAR(256) NOT NULL,
--     profile_picture VARCHAR(256) DEFAULT 'image1.png',
--     is_admin     BOOLEAN NOT NULL DEFAULT false
-- );
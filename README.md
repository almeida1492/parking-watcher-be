## Plugging in the development database

- Run the **postgreSQL** server locally;
- Replace the `DATABASE_URL` with the following:

```
DATABASE_URL=postgresql://[USERNAME]@localhost:5432
```

- Comment the shadow db URL in _prisma/schema.prisma_;
- Run the server or open the studio and it's going to read data from the local db.

## Prisma Studio

With the local database being served or with the remote one plugged in, run the following command:

```
npx prisma studio
```

## Deploying into production

To deploy a new version, run the following in the command line:

```
git push heroku master
```

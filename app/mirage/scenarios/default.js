export default function(server) {

  // Seed your development database using your factories. This
  // data will not be loaded in your tests.

  server.createList('parishioner', 100);
  server.createList('offering', 0);
}

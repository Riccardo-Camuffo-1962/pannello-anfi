const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function () {
  // this is to add Creative Tim licenses in the production mode for the minified js
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

 ** $Id:$
 ** ---------------------------------------------------------------------------
 **                            QUODLIBET ABYSSINIANS
 **                        ANFI - PANNELLO DI CONTROLLO 
 ** ---------------------------------------------------------------------------
 ** @author: Riccardo Camuffo (riccardo.camuffo@gmail.com)
 ** @link: http://www.quodlibet-abys.it
 ** @copyright: Copyright (c) 2021 - Riccardo Camuffo - Quodlibet Abys
 **
 ** Portions of code courtesy of: QS2 Cattery Management System
 **                               Riccardo Camuffo - Quodlibet Abyssinians
 ** 
 ** Template based on Paper Kit React - v1.3.0
 ** Copyright 2021 Creative Tim (http://www.creative-tim.com)
 ** Coded by Creative Tim
 **
 ** ---------------------------------------------------------------------------
 **               Viagiar descanta, ma chi parte mona, torna mona
 ** ---------------------------------------------------------------------------
 **
 ** The above copyright notice and this permission notice shall be included in all 
 ** copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified html
  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

 ** $Id:$
 ** ---------------------------------------------------------------------------
 **                            QUODLIBET ABYSSINIANS
 **                        ANFI - PANNELLO DI CONTROLLO 
 ** ---------------------------------------------------------------------------
 ** @author: Riccardo Camuffo (riccardo.camuffo@gmail.com)
 ** @link: http://www.quodlibet-abys.it
 ** @copyright: Copyright (c) 2021 - Riccardo Camuffo - Quodlibet Abys
 **
 ** Portions of code courtesy of: QS2 Cattery Management System
 **                               Riccardo Camuffo - Quodlibet Abyssinians
 ** 
 ** Template based on Paper Kit React - v1.3.0
 ** Copyright 2021 Creative Tim (http://www.creative-tim.com)
 ** Coded by Creative Tim
 **
 ** ---------------------------------------------------------------------------
 **               Viagiar descanta, ma chi parte mona, torna mona
 ** ---------------------------------------------------------------------------
 **
 ** The above copyright notice and this permission notice shall be included in all 
 ** copies or substantial portions of the Software.

-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified css
  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

 ** $Id:$
 ** ---------------------------------------------------------------------------
 **                            QUODLIBET ABYSSINIANS
 **                        ANFI - PANNELLO DI CONTROLLO 
 ** ---------------------------------------------------------------------------
 ** @author: Riccardo Camuffo (riccardo.camuffo@gmail.com)
 ** @link: http://www.quodlibet-abys.it
 ** @copyright: Copyright (c) 2021 - Riccardo Camuffo - Quodlibet Abys
 **
 ** Portions of code courtesy of: QS2 Cattery Management System
 **                               Riccardo Camuffo - Quodlibet Abyssinians
 ** 
 ** Template based on Paper Kit React - v1.3.0
 ** Copyright 2021 Creative Tim (http://www.creative-tim.com)
 ** Coded by Creative Tim
 **
 ** ---------------------------------------------------------------------------
 **               Viagiar descanta, ma chi parte mona, torna mona
 ** ---------------------------------------------------------------------------
 **
 ** The above copyright notice and this permission notice shall be included in all 
 ** copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});

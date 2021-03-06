imgPath = 'img/';

levelBuilder = {
  setup: function(stage, level, platformWidth, goalOffset) {

    clearBtns();
    stage.tween = stage.tweenBack = false;
    stage.position = {
      rotate: 0.6
    };

    stage.io.addToGroup('BACKGROUND',
      new iio.Rect(pxConv(stage.cWidth / 2), pxConv(stage.cHeight / 2),
        pxConv(stage.cWidth), pxConv(stage.cHeight))
      .addImage(imgPath + level + '.png'), -30);

    GAMEAREA = stage.io.addToGroup('GAMEAREA', new iio.Rect(pxConv(stage.cWidth / 2), pxConv(stage.cHeight / 2 - 20), pxConv(stage.cWidth / 2), pxConv(300))
      .setFillStyle('rgba(0,0,0,0)'), -20);



    if (!goalOffset) {
      stage.goalPos = new iio.Vec(GAMEWIDTH / 2, GAMEAREA.pos.y - (GAMEAREA.height / 2));
    } else {
      stage.goalPos = new iio.Vec(goalOffset, GAMEAREA.pos.y - (GAMEAREA.height / 2));
    }

    stage.platformPos = new iio.Vec(GAMEWIDTH / 2, GAMEAREA.pos.y + (GAMEAREA.height / 2) - pxConv(10));
    if (!platformWidth) {
      platformWidth = pxConv(stage.cWidth / 5.1, true);
      platformFriction = 1;
    } else {
      platformFriction = 0.2;
    }


    var fixDef = new b2FixtureDef;
    fixDef.friction = 1;
    fixDef.restitution = 0.5;

    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_staticBody;

    //GROUND
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(pxConv(GAMEWIDTH / 2, true), pxConv(1, true));
    bodyDef.position.Set(pxConv(GAMEWIDTH / 2, true), pxConv(GAMEHEIGHT, true));
    prepShape(bodyDef, fixDef);

    //BASIN WALLS
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(pxConv(1, true), pxConv(150 / 2, true));
    bodyDef.position.Set(pxConv(0 - 0, true), pxConv(GAMEHEIGHT - 70, true));
    prepShape(bodyDef, fixDef);

    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(pxConv(1, true), pxConv(150 / 2, true));
    bodyDef.position.Set(pxConv(GAMEWIDTH - 0, true), pxConv(GAMEHEIGHT - 70, true));
    prepShape(bodyDef, fixDef);

    //WORLD BOUNDRIES
    fixDef.friction = 0;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(pxConv(1, true), pxConv(201, true));
    bodyDef.angle = -Math.PI / 6;
    bodyDef.position.Set(pxConv(0 - 100, true), pxConv(GAMEHEIGHT - 320, true));
    prepShape(bodyDef, fixDef);

    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(pxConv(1, true), pxConv(200, true));
    bodyDef.angle = (Math.PI / 6);
    bodyDef.position.Set(pxConv(GAMEWIDTH + 100, true), pxConv(GAMEHEIGHT - 320, true));
    prepShape(bodyDef, fixDef);

    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(pxConv(1, true), pxConv(210, true));
    bodyDef.angle = -Math.PI / 3;
    bodyDef.position.Set(pxConv(GAMEWIDTH + 20, true), pxConv(-120, true));
    prepShape(bodyDef, fixDef);

    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(pxConv(1, true), pxConv(210, true));
    bodyDef.angle = Math.PI / 3;
    bodyDef.position.Set(pxConv(-20, true), pxConv(-120, true));
    prepShape(bodyDef, fixDef);

    //IF RETINA
    if (PIXEL_RATIO > 1) {
      fixDef.shape = new b2PolygonShape;
      fixDef.shape.SetAsBox(pxConv(1, true), pxConv(200, true));
      bodyDef.angle = 0;
      bodyDef.position.Set(pxConv(-140, true), pxConv(-0, true));
      prepShape(bodyDef, fixDef).setFillStyle('green');

      fixDef.shape = new b2PolygonShape;
      fixDef.shape.SetAsBox(pxConv(1, true), pxConv(200, true));
      bodyDef.angle = 0;
      bodyDef.position.Set(pxConv(460, true), pxConv(-0, true));
      prepShape(bodyDef, fixDef).setFillStyle('green');

    }
    //PLATFORM
    fixDef.friction = platformFriction;
    bodyDef.angle = 0;
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.Set(pxConv(stage.platformPos.x, true), pxConv(stage.platformPos.y / PIXEL_RATIO, true));
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(platformWidth, pxConv(5, true));
    prepShape(bodyDef, fixDef).setFillStyle(colors['brown'][0]);

    //GOAL
    var goalBodyDef = new b2BodyDef;
    goalBodyDef.type = b2Body.b2_kinematicBody;

    var goalFixDef = new b2FixtureDef;
    goalFixDef.isSensor = true;
    goalFixDef.userData = 'goal';
    goalFixDef.shape = new b2PolygonShape;

    stage.goalEffect = stage.io.addToGroup('GOALEFFECTS', new iio.Circle(pxConv(stage.goalPos.x), pxConv(stage.goalPos.y / PIXEL_RATIO), 0)
      .setFillStyle('rgba(244, 223, 59,0.3)').setStrokeStyle('rgba(233, 195, 53,0.3)', pxConv(2)));

    goalBodyDef.angle = Math.PI / 1;
    goalFixDef.shape.SetAsArray([
      new b2Vec2(pxConv(0.94), pxConv(0.30)),
      new b2Vec2(pxConv(0.34), pxConv(0.47)),
      new b2Vec2(pxConv(-0.00), pxConv(0.99)),
      new b2Vec2(pxConv(-0.34), pxConv(0.47)),

      new b2Vec2(pxConv(-0.94), pxConv(0.30)),
      new b2Vec2(pxConv(-0.56), pxConv(-0.18)),
      new b2Vec2(pxConv(-0.58), pxConv(-0.80)),
      new b2Vec2(pxConv(0.00), pxConv(-0.59)),

      new b2Vec2(pxConv(0.58), pxConv(-0.80)),
      new b2Vec2(pxConv(0.56), pxConv(-0.18))
    ]);
    goalBodyDef.position.Set(pxConv(stage.goalPos.x, true), pxConv(stage.goalPos.y / PIXEL_RATIO, true));


    //prepShape(goalBodyDef, goalFixDef).setFillStyle(colors['orange'][0]).setStrokeStyle(colors['orange'][1],pxConv(2));
    goalObj = stage.io.addObj(world.CreateBody(goalBodyDef)).CreateFixture(goalFixDef);

    goalObj.GetShape().prepGraphics(stage.io.b2Scale)
      .setFillStyle(colors['orange'][0])
      .setStrokeStyle(colors['orange'][1], pxConv(2));

    //Animate goal
    if (!stage.tween) {
      stage.tween = new TWEEN.Tween(stage.position)
        .to({
          rotate: 0.9
        }, 1500)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
          update(this.rotate);
        });
      stage.tweenBack = new TWEEN.Tween(stage.position)
        .to({
          rotate: 0.4
        }, 1500)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
          update(this.rotate);
        });

      stage.tween.chain(stage.tweenBack);
      stage.tweenBack.chain(stage.tween);
      stage.tween.start();
    }

    function update(rotate) {
      goalObj.GetBody().SetAngle(rotate);
    }

  },
  tick: 0,
  step: function(stage) {
    var lio = stage;

    if (stage.gameEnd == true) {}
    if (stage.paused) {}
    if (stage.goalTouchTime >= stage.goalTime) {
      var fixDef = new b2FixtureDef;
      var bodyDef = new b2BodyDef;

      fixDef.friction = 0.5;
      fixDef.restitution = 0.3;
      fixDef.density = 5;
      bodyDef.type = b2Body.b2_dynamicBody;
      fixDef.shape = new b2PolygonShape;

      if (stage.gameWinAnim == false) {
        world.m_gravity.y = 0;
        for (var i = 0; i < 25; i++) {
          fixDef.shape.SetAsBox(iio.getRandomNum(pxConv(0.05), pxConv(0.1)), iio.getRandomNum(pxConv(0.05), pxConv(0.1)));
          bodyDef.position.Set(pxConv(stage.goalPos.x + iio.getRandomNum(-20, 20), true), pxConv(stage.goalPos.y / PIXEL_RATIO + iio.getRandomNum(-20, 20), true));
          bodyDef.linearVelocity.Set(pxConv(iio.getRandomNum(-30, 30)), pxConv(iio.getRandomNum(-30, 30)));
          prepShape(bodyDef, fixDef).setFillStyle(colors['orange'][0]).setStrokeStyle(colors['orange'][1], pxConv(2));
        }
      }
      if (stage.gameWinAnim) {
        smashSound.play();

        world.DestroyBody(lio.goal.GetBody());
      }

      stage.gameWinAnim = true;
      setTimeout(function() {
        lio.gameWin = true;
      }, 1000)

    }

    if (stage.goalTouch) {
      if (stage.goalTouch.GetBody() != selectedBody && stage.goalTouchTime <= stage.goalTime) {
        stage.goalEffect.radius = pxConv(stage.goalTouchTime);
        stage.goalTouchTime++;
      } else {
        stage.goalTouchTime = 0;
        stage.goalEffect.radius = stage.goalTouchTime;
      }
    }

    listener.BeginContact = function(contact) {
      if (contact.GetFixtureB().GetUserData() == 'goal') {
        lio.goalTouch = contact.GetFixtureA();
        lio.goal = contact.GetFixtureB();

      }
    }
    listener.EndContact = function(contact) {
      if (contact.GetFixtureB().GetUserData() == 'goal') {
        lio.goalTouchTime = 0;
        lio.goalTouch = undefined;
        lio.goalEffect.radius = 0;
      }
    }

  },
  blockBuilder: function(blocksList) {
    //SHAPES!
    bodyDef = new b2BodyDef;
    fixDef = new b2FixtureDef;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.3;
    fixDef.density = 5;
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2PolygonShape;

    if (blocksList) {
      for (var i = 0; i < blocksList.length; i++) {
        for (index in blocksList[i].vertexs) {
          blocksList[i].vertexs[index].x = pxConv(blocksList[i].vertexs[index].x);
          blocksList[i].vertexs[index].y = pxConv(blocksList[i].vertexs[index].y);
        }
        fixDef.shape.SetAsArray(blocksList[i].vertexs);
        bodyDef.position.Set(0, 0);
        prepShape(bodyDef, fixDef).setFillStyle(blocksList[i].color[0]).setStrokeStyle(blocksList[i].color[1], 2);
      }
    }
  }
}

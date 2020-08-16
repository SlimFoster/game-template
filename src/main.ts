import EntityComponentSystem, {ECS} from "@fritzy/ecs";

require("fpsmeter");

class Game {

    ecs: ECS;
    last: number;
    step: number = 1 / 60;
    fpsmeter: any;

    constructor() {
        this.last = this.timestamp();
        this.ecs = new EntityComponentSystem.ECS();
        // @ts-ignore
        this.fpsmeter = new FPSMeter({ decimals: 0, graph: true, theme: 'dark', left: '5px' });
    }

    timestamp =
        window.performance && window.performance.now
            ? () => window.performance.now()
            : () => new Date().getTime();

    tick() {
        this.fpsmeter.tickStart();

        let now = this.timestamp();
        let dt = Math.min(1, (now - this.last) / 1000);

        while (dt > this.step) {
            dt -= this.step;
            this.update(this.step);
        }

        this.render();
        this.last = now;
        requestAnimationFrame(() => this.tick());

        this.fpsmeter.tick();
    }

    update(dt: number) {
        this.ecs.tick();
    }

    render() {
    }
}

new Game().tick();
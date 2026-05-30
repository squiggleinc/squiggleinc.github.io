import ShaderBackground from "@/components/effects/ShaderBackground";
import ShimmerButton from "@/components/effects/ShimmerButton";

export default function Home() {
  return (
    <main className="relative min-h-screen grid place-items-center">
      <ShaderBackground />
      <div className="glass-card rounded-2xl p-10 text-center">
        <h1 className="gradient-text text-5xl font-bold">Vincent Sarkis</h1>
        <ShimmerButton className="mt-6">It works</ShimmerButton>
      </div>
    </main>
  );
}

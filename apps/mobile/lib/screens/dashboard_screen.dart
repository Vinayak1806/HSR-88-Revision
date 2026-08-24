import 'package:flutter/material.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('NEET Community'),
        actions: [IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_outlined))],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          Row(
            children: [
              Expanded(child: _StatCard(label: 'Streak', value: '0 days')),
              SizedBox(width: 12),
              Expanded(child: _StatCard(label: 'AI doubts left', value: '5 / 5')),
            ],
          ),
          SizedBox(height: 12),
          Card(
            child: ListTile(
              leading: Icon(Icons.quiz_outlined),
              title: Text("Today's Quiz"),
              subtitle: Text('Placeholder — daily quiz will appear here (NEET-19).'),
            ),
          ),
          Card(
            child: ListTile(
              leading: Icon(Icons.trending_up),
              title: Text('Weak topics'),
              subtitle: Text('Kinematics · Genetics · Thermodynamics'),
            ),
          ),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: 0,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.dashboard_outlined), label: 'Home'),
          NavigationDestination(icon: Icon(Icons.quiz_outlined), label: 'Quizzes'),
          NavigationDestination(icon: Icon(Icons.emoji_events_outlined), label: 'Leaderboard'),
          NavigationDestination(icon: Icon(Icons.smart_toy_outlined), label: 'AI Doubt'),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({required this.label, required this.value});
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: Theme.of(context).textTheme.bodySmall),
            const SizedBox(height: 8),
            Text(value, style: Theme.of(context).textTheme.titleLarge),
          ],
        ),
      ),
    );
  }
}

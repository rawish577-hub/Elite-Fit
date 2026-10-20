
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../supabase';

const GREEN = '#39FF88';

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotifications = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) throw new Error('Please log in again.');

      const { data, error } = await supabase
        .from('notifications')
        .select('id, title, message, type, is_read, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setNotifications(data || []);
    } catch (error) {
      console.error('Notifications error:', error.message);
      Alert.alert('Error', error.message || 'Could not load notifications.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadNotifications();
    }, [loadNotifications])
  );

  const markAsRead = async (item) => {
    if (item.is_read) return;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', item.id);

    if (error) {
      Alert.alert('Error', 'Could not mark notification as read.');
      return;
    }

    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === item.id
          ? { ...notification, is_read: true }
          : notification
      )
    );
  };

  const markAllAsRead = async () => {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) throw new Error('Please log in again.');

      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (error) throw error;

      setNotifications((previous) =>
        previous.map((item) => ({ ...item, is_read: true }))
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return '';

    return parsedDate.toLocaleString();
  };

  const unreadCount = notifications.filter(
    (item) => !item.is_read
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Notifications</Text>

        <View style={styles.headerSpace} />
      </View>

      {unreadCount > 0 && (
        <TouchableOpacity
          style={styles.markAllButton}
          onPress={markAllAsRead}
        >
          <Text style={styles.markAllText}>
            Mark all as read ({unreadCount})
          </Text>
        </TouchableOpacity>
      )}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={GREEN} />
          <Text style={styles.infoText}>Loading notifications...</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadNotifications(true)}
              tintColor={GREEN}
            />
          }
        >
          {notifications.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>🔔</Text>
              <Text style={styles.emptyTitle}>No Notifications Yet</Text>
              <Text style={styles.emptyText}>
                Your notifications will appear here once they are created.
              </Text>
            </View>
          ) : (
            notifications.map((item) => (
              <TouchableOpacity
                key={String(item.id)}
                style={[
                  styles.notificationCard,
                  !item.is_read && styles.unreadCard,
                ]}
                activeOpacity={0.8}
                onPress={() => markAsRead(item)}
              >
                <View style={styles.iconBox}>
                  <Text style={styles.notificationIcon}>
                    {item.type === 'workout'
                      ? '💪'
                      : item.type === 'nutrition'
                      ? '🥗'
                      : item.type === 'progress'
                      ? '📈'
                      : '🔔'}
                  </Text>
                </View>

                <View style={styles.notificationContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.notificationTitle}>
                      {item.title}
                    </Text>

                    {!item.is_read && <View style={styles.unreadDot} />}
                  </View>

                  <Text style={styles.notificationMessage}>
                    {item.message}
                  </Text>

                  <Text style={styles.dateText}>
                    {formatDate(item.created_at)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
  },
  header: {
    height: 70,
    backgroundColor: '#111613',
    borderBottomWidth: 1,
    borderBottomColor: '#26302B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#171D1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 35,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  headerSpace: {
    width: 42,
  },
  markAllButton: {
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
    padding: 8,
  },
  markAllText: {
    color: GREEN,
    fontSize: 12,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    color: '#9BA39F',
    marginTop: 12,
    fontSize: 13,
  },
  listContent: {
    padding: 18,
    paddingBottom: 35,
    flexGrow: 1,
  },
  emptyCard: {
    marginTop: 70,
    alignItems: 'center',
    padding: 25,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    color: '#89928D',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 21,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#171D1A',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#26302B',
  },
  unreadCard: {
    borderColor: '#39FF88',
    backgroundColor: '#17251C',
  },
  iconBox: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: '#202923',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationIcon: {
    fontSize: 22,
  },
  notificationContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: GREEN,
    marginLeft: 8,
  },
  notificationMessage: {
    color: '#B5BDB8',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
  },
  dateText: {
    color: '#77817A',
    fontSize: 10,
    marginTop: 10,
  },
});

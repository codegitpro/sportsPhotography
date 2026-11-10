package com.cl.dao;

import com.cl.entity.KaojisheyingEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.KaojisheyingView;


/**
 * 考级摄影
 * 
 * @author 
 * @email 
 * @date 2026-03-12 19:47:41
 */
public interface KaojisheyingDao extends BaseMapper<KaojisheyingEntity> {
	
	List<KaojisheyingView> selectListView(@Param("ew") Wrapper<KaojisheyingEntity> wrapper);

	List<KaojisheyingView> selectListView(Pagination page,@Param("ew") Wrapper<KaojisheyingEntity> wrapper);
	
	KaojisheyingView selectView(@Param("ew") Wrapper<KaojisheyingEntity> wrapper);


    List<Map<String, Object>> selectValue(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<KaojisheyingEntity> wrapper);

    List<Map<String, Object>> selectTimeStatValue(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<KaojisheyingEntity> wrapper);

    List<Map<String, Object>> selectGroup(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<KaojisheyingEntity> wrapper);



}
